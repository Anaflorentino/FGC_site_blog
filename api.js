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

// Função para converter BBCode para Markdown
const bbcodeToMarkdown = (content) => {
  // Substitui a tag [size=4] para títulos de nível 2 (##)
  content = content.replace(/\[size=\d+\](.*?)\[\/size\]/g, '## $1');
  
  // Substitui as tags de negrito [b] para ** em Markdown
  content = content.replace(/\[b\](.*?)\[\/b\]/g, '**$1**');
  
  // Substitui as tags de itálico [i] para * em Markdown
  content = content.replace(/\[i\](.*?)\[\/i\]/g, '*$1*');
  
  // Adicione mais substituições conforme necessário, como [url], [img], etc.
  
  return content;
};

// Função para gerar o conteúdo do Markdown
const generateMarkdown = (data) => {
  const contentWithMarkdown = bbcodeToMarkdown(data.content); // Converte BBCode para Markdown
  const tags = data.tags ? data.tags.split(',').map(tag => tag.trim()).join(', ') : ''; // Trata as tags

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
const createMarkdownFile = (entry) => {
  const fileName = entry.file_name; // Nome do arquivo baseado no campo 'file_name'
  const markdownContent = generateMarkdown(entry);
  const filePath = path.join(outputDir, `${fileName}.md`);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(filePath, markdownContent, 'utf8');
  console.log(`Arquivo Markdown gerado: ${filePath}`);
};

// Função para buscar dados da API e salvar arquivos .json na pasta data
const fetchDataFromAPI = async () => {
  try {
    console.log('Buscando dados da API...');

    const response = await axios.get(API_URL);

    // Inspeciona a estrutura da resposta da API
    console.log('Resposta da API:', response.data);

    const data = response.data?.response?.results || response.data?.results || response.data;

    if (Array.isArray(data)) {
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      // Salva cada item como um arquivo .json individual na pasta data
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

  files.forEach((file) => {
    if (path.extname(file) === '.json') {
      const filePath = path.join(dataDir, file);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

      // Usa o campo 'file_name' como o nome do arquivo .md
      createMarkdownFile(data);
    }
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
