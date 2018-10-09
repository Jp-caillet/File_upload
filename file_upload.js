module.exports.fileUpload = function({csrfToken}) {
  const uploadForm = `
    <h1>upload</h1>
    <form action="/fileupload" method="post" enctype="multipart/form-data" >
      <input type="hidden" name="_csrf" value="${csrfToken}"/>
      <input type="file" name="file">
      <input type="submit" value="Upload Image" name="submit">
    </form>
  `;
  return `
    <!doctype html>
    <html lang="fr">
    <head>
      <meta charset="utf-8">
      <title>Demo App</title>
    </head>
      <body>
        <h1>HTML page over TLS</h1>
          <div>
           ${uploadForm}
          </div>
         
      </body>
    </head>
  `;
};