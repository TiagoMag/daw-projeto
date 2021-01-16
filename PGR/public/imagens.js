function showImage(name,type,user){
    console.log("type = " + type)
    if(type == 'application/x-zip-compressed'){
        console.log("É um zip.")
        var ficheiro = '<p>' + name + ', ' + type + '</p>'
    }
    else if (type == 'image/png' || type == 'image/jpeg')
        var ficheiro = '<img src="/fileStore/' + user + '/' + name + '" width="80%"/>'
    else
        var ficheiro = '<p>' + name + ', ' + type + '</p>'

    var fileObj = `
        <div class="w3-row w3-margin">
            <div class="w3-col s6">
                ${ficheiro}
            </div>
            <div class="w3-col s6 w3-border">
                <p>Filename: ${name}</p>
                <p>Mimetype: ${type}</p>
            </div>
        </div>
    
    `
    
    var download = $('<div><a href="/files/download/' + name + '">Download</a></div>')
    $("#display").empty()
    $("#display").append(fileObj,download)
    $("#display").modal()
}

function addFile(){
    var file = $( `
    <hr>

    <div class="w3-row w3-margin-bottom">
        <div class="w3-col s3">
           <label class="w3-text-teal">Description</label>
        </div>
        <div class="w3-col s9 w3-border">
           <input class="w3-input w3-border w3-light-grey" type="text" name="desc">
        </div>
    </div>
    <div class="w3-row w3-margin-bottom">
        <div class="w3-col s3">
           <label class="w3-text-teal">Select File</label>
        </div>
        <div class="w3-col s9 w3-border">
           <input class="w3-input w3-border w3-light-grey" type="file" name="myFile">
        </div>
    </div>
    <div class="w3-row w3-margin-bottom">
    <div class="w3-col s3"><label class="w3-text-teal">File Type</label></div>
    <div class="w3-col s9 w3-border"><select id="tipo" name="tipo">
            <option value="relatorio">Relatório</option>
            <option value="tese">Tese</option>
            <option value="artigo">Artigo</option>
            <option value="aplicacao">Aplicação</option>
            <option value="slides">Slides</option>
            <option value="teste">Teste</option>
            <option value="problema">Problema Resolvido</option>
        </select></div>
</div>

    `)
    $("#adiciona").append(file)
}