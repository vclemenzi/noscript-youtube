export function formatDesc(str: string): string {
  const regexLink = /(https?:\/\/[^\s]+)/g;

  const html = str.replace(regexLink, (match) => {
    return `<a href="${match}" class="text-blue-400" target="_blank">${match}</a>`;
  });

  return html;
}
