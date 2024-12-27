const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Configuração da URL da API
const API_URL = 'https://flashguyscleaning.com/version-test/api/1.1/wf/blogposts';

// Caminhos dos diretórios
const dataDir = path.join(__dirname, 'src/data');
const outputDir = path.join(__dirname, 'src/blog/posts');

// Função para formatar a data
const formatDate = (date) => {
  const [day, month, year] = date.split('-');
  return `${year}-${month}-${day}`;
};

const bbcodeToMarkdown = (content) => {
  // Convertendo cabeçalhos (H1-H6 e BBCode)
  content = content.replace(/\[h([1-6])\](.*?)\[\/h\1\]/g, (_, level, text) => `#`.repeat(level) + ` ${text}`);

  // Convertendo negrito, itálico e sublinhado
  content = content.replace(/\[b\](.*?)\[\/b\]/g, '**$1**');
  content = content.replace(/\[i\](.*?)\[\/i\]/g, '*$1*');
  content = content.replace(/\[u\](.*?)\[\/u\]/g, '_$1_');

  // Convertendo listas não ordenadas ([ml] e [ul])
  content = content.replace(/\[ml\]\[ul\](.*?)\[\/ul\]\[\/ml\]/gs, (_, items) => {
    return items
      .replace(/\[li.*?\](.*?)\[\/li\]/g, (_, item) => `- ${item.trim()}`)
      .trim()
      .replace(/- /g, '\n- '); // Adiciona quebra de linha antes de cada item
  });

  // Convertendo listas ordenadas ([ml] e [ol])
  content = content.replace(/\[ml\]\[ol\](.*?)\[\/ol\]\[\/ml\]/gs, (_, items) => {
    let i = 1;
    return items
      .replace(/\[li.*?\](.*?)\[\/li\]/g, (_, item) => `${i++}. ${item.trim()}`)
      .trim()
      .replace(/^\d+\. /gm, '\n$&'); // Adiciona quebra de linha antes de cada item
  });

  // Convertendo blocos de citação
  content = content.replace(/\[quote\](.*?)\[\/quote\]/gs, '> $1');

  // Convertendo quebras de linha e parágrafos
  content = content.replace(/\n/g, '\n\n');

  // Removendo quaisquer tags BBCode restantes
  content = content.replace(/\[.*?\]/g, '');

  return content.trim();
};



// Função para gerar o conteúdo do Markdown
const generateMarkdown = (data) => {
  const contentWithMarkdown = bbcodeToMarkdown(data.content);
  const tags = data.tags ? data.tags.split(',').map(tag => tag.trim()).join(', ') : '';

  return `
---
layout: ${data.layout}
title: ${data.title}
date: ${formatDate(data.date)}
author: ${data.author}
description: ${data.description}
image: "${data.image}"
tags: ${tags}
---

${contentWithMarkdown}
  `.trim();
};

// Função para criar o arquivo Markdown
const createMarkdownFile = (entry, allArticles) => {
  const fileName = entry.file_name;
  const markdownContent = generateMarkdown(entry);
  const relatedArticles = findRelatedArticles(entry, allArticles);

  let relatedArticlesHtml = '';

  if (relatedArticles.length > 0) {
    relatedArticlesHtml = `
    <div class="related-articles">
      <h2>Related articles</h2>
      <ul>
        ${relatedArticles.map(article => {
          return `
            <li class="related-article">
              <a href="/blog/posts/${article.file_name}/">
                <div class="related-article-image">
                  <img src="${article.image}" alt="${article.title}">
                </div>
                <div class="related-article-info">
                  <h3>${article.title}</h3>
                  <p>${article.description}</p>
                  <p class="tags">Categories: ${article.tags}</p>
                </div>
              </a>
            </li>
          `;
        }).join('')}
      </ul>
    </div>
    `;
  }

  const finalContent = markdownContent + '\n\n' + relatedArticlesHtml;

  const filePath = path.join(outputDir, `${fileName}.md`);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(filePath, finalContent, 'utf8');
  console.log(`Arquivo Markdown gerado: ${filePath}`);
};

// Função para encontrar artigos relacionados
const findRelatedArticles = (currentArticle, allArticles) => {
  const currentTags = currentArticle.tags.split(',').map(tag => tag.trim());

  return allArticles.filter(article => {
    if (article.file_name === currentArticle.file_name) return false;

    const articleTags = article.tags.split(',').map(tag => tag.trim());

    return articleTags.some(tag => currentTags.includes(tag));
  });
};

// Função para buscar dados da API
const fetchDataFromAPI = async () => {
  try {
    console.log('Buscando dados da API...');

    const response = await axios.get(API_URL);

    const data = response.data?.response?.results || response.data?.results || response.data;

    if (Array.isArray(data)) {
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      data.forEach((item, index) => {
        const filePath = path.join(dataDir, `post_${index + 1}.json`);
        fs.writeFileSync(filePath, JSON.stringify(item, null, 2), 'utf-8');
        console.log(`Arquivo JSON salvo: ${filePath}`);
      });

      return true;
    } else {
      console.error('Formato inesperado na resposta da API:', response.data);
      return false;
    }
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error.message);
    return false;
  }
};

// Função para converter arquivos JSON para Markdown
const convertJsonToMarkdown = () => {
  if (!fs.existsSync(dataDir)) {
    console.error('Diretório data não encontrado. Certifique-se de que os arquivos JSON foram salvos.');
    return;
  }

  const files = fs.readdirSync(dataDir);

  const allArticles = files
    .filter(file => path.extname(file) === '.json')
    .map(file => {
      const filePath = path.join(dataDir, file);
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    });

  allArticles.forEach((article) => {
    createMarkdownFile(article, allArticles);
  });
};

// Fluxo principal
(async () => {
  const dataFetched = await fetchDataFromAPI();

  if (dataFetched) {
    console.log('Convertendo arquivos JSON para Markdown...');
    convertJsonToMarkdown();
  }
})();
