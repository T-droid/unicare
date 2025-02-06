export const mailTemplate = function (content: string, title: string) {
    return `<html>
          <head>
              <title>${title}</title>
          </head>
          <body>${content}</body>
      </html>`;
};

