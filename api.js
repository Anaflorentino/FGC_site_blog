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

// Função para converter BBCode ou HTML para Markdown
const bbcodeToMarkdown = (content) => {
  content = content.replace(/<h([1-6])>(.*?)<\/h\1>/g, (match, p1, p2) => {
    const hashes = '#'.repeat(p1); 
    return `${hashes} ${p2}`;
  });

  content = content.replace(/\[h2\](.*?)\[\/h2\]/g, '## $1');
  content = content.replace(/\[h3\](.*?)\[\/h3\]/g, '### $1');
  content = content.replace(/\[b\](.*?)\[\/b\]/g, '**$1**');
  content = content.replace(/\[i\](.*?)\[\/i\]/g, '*$1*');
  content = content.replace(/\[u\](.*?)\[\/u\]/g, '~$1~');
  content = content.replace(/\[url=(.*?)\](.*?)\[\/url\]/g, '[$2]($1)');
  content = content.replace(/\[url\](.*?)\[\/url\]/g, '[$1]($1)');
  content = content.replace(/\[img\](.*?)\[\/img\]/g, '![]($1)');
  content = content.replace(/\[img=(.*?)\](.*?)\[\/img\]/g, '![$2]($1)');
  content = content.replace(/\[list\](.*?)\[\/list\]/gs, (match, p1) => {
    return p1.replace(/\[\*\](.*?)\[/g, '\n- $1\n');
  });

  content = content.replace(/\[ul\]/g, '').replace(/\[\/ul\]/g, '');
  content = content.replace(/\[ol\]/g, '').replace(/\[\/ol\]/g, '');
  content = content.replace(/<br\s*\/?>/g, '\n');
  content = content.replace(/<\/?p>/g, '\n');
  content = content.replace(/<blockquote>(.*?)<\/blockquote>/gs, '> $1');

  return content;
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

// Função para criar o arquivo Markdown com artigos relacionados
const createMarkdownFile = (entry, allArticles) => {
  const fileName = entry.file_name;
  const markdownContent = generateMarkdown(entry);
  const relatedArticles = findRelatedArticles(entry, allArticles);
  
  let relatedArticlesHtml = '';

  if (relatedArticles.length > 0) {
    relatedArticlesHtml = `
    <div class="related-articles">
      <h2>Artigos Relacionados</h2>
      <ul>
        ${relatedArticles.map(article => {
          return `
            <li class="related-article">
              <div class="related-article-image">
                <img src="${article.image}" alt="${article.title}">
              </div>
              <div class="related-article-info">
                <h3><a href="/blog/posts/${article.file_name}/">${article.title}</a></h3>
                <p>${article.description}</p>
                <p class="tags">Tags: ${article.tags}</p>
              </div>
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

// Função para encontrar artigos relacionados com base nas tags
const findRelatedArticles = (currentArticle, allArticles) => {
  const currentTags = currentArticle.tags.split(',').map(tag => tag.trim());
  
  return allArticles.filter(article => {
    if (article.file_name === currentArticle.file_name) return false; // Exclui o próprio artigo
    
    const articleTags = article.tags.split(',').map(tag => tag.trim());
    
    return articleTags.some(tag => currentTags.includes(tag));
  });
};

// Função para buscar dados da API e salvar arquivos .json na pasta data
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

// Função para converter arquivos JSON na pasta data para Markdown
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
