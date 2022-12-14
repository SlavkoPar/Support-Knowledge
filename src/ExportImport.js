import JSZip from 'jszip';

export const LocalStorage = {

  display: async () => {

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      console.log("============");
      console.log(key);
      console.log("\n============");
      console.log(key ? await localStorage.getItem(key) : "null");

      if (key === "SUPPORT_TOP") {
        console.log(JSON.stringify(JSON.parse(localStorage.getItem(key), null, 2)))
      }
      else {
        if (key && localStorage.getItem(key)) {
          const obj = JSON.parse(localStorage.getItem(key))
          // eslint-disable-next-line no-loop-func
          Object.values(obj).forEach(o => console.log(JSON.stringify(o)))
        }
      }
    }

    let s = "";
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      s += '<h7>' + (key ?? "null") + '</h7>';

      if (key === "SUPPORT_TOP") {
        s += '<ul>';
        s += JSON.stringify(JSON.parse(localStorage.getItem(key)), null, 2)
        s += '</ul>';
      }
      else {
        if (key && localStorage.getItem(key)) {
          const obj = JSON.parse(localStorage.getItem(key))
          s += '<ul>';
          // eslint-disable-next-line no-loop-func
          Object.values(obj).forEach(o => s += '<li>' + JSON.stringify(o) + '</li>')
          s += '</ul>';
        }
      }

    }
    return Promise.resolve(s);
  },

  clear: (clearAnswers, clearQuestions) => {
    if (window.confirm('Are you sure?') === true) {
      const top = localStorage.getItem('SUPPORT_TOP')
      const users = localStorage.getItem('SUPPORT_USERS')

      LocalStorage.export();
      localStorage.clear();

      clearAnswers();
      clearQuestions();

      if (top)
        localStorage.setItem('SUPPORT_TOP', top)

      if (users)
        localStorage.setItem('SUPPORT_USERS', users)

      // after LocalStorage.clear(),
      // we don't load demo data.json in loadCategories()
      localStorage.setItem('SUPPORT_CATEGORIES', "")
      localStorage.setItem('SUPPORT_ANSWERS', "")
    }
  },

  export: () => {
    let data = JSON.stringify(localStorage)
    const zip = true

    if (!data) {
      console.error('Console.save: No data')
    }

    console.log(new Date().toISOString())
    const f = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    const filename = `SupportKnowlegde_${f}.${(zip ? 'zip' : 'json')}`

    // if (typeof data === "object") {
    //   data = JSON.stringify(data, undefined, 4)
    // }

    if (zip) {
      const zip = new JSZip();
      zip.file("KnowledgeSupport.json", data);
      zip.generateAsync({ type: "blob" })
        .then(function (blob) {
          const e = document.createEvent('MouseEvents')
          const a = document.createElement('a')
          a.download = filename;
          a.href = window.URL.createObjectURL(blob)
          a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
          e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
          a.dispatchEvent(e)
        });
    }
    else {
      var blob = new Blob([data], { type: 'text/json' }),
        e = document.createEvent('MouseEvents'),
        a = document.createElement('a')

      a.download = filename
      a.href = window.URL.createObjectURL(blob)
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
      e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      a.dispatchEvent(e)
    }
  },

  import: async (file, getAllAnswers, loadCategories) => {
    const zipper = new JSZip();
    zipper.loadAsync(file).then(function (contents) {
      Object.keys(contents.files).forEach(function (filename) {
        zipper.file(filename).async('string').then(function (content) {
          console.log(filename, "CONTENT:", content);

          const data = JSON.parse(content);
          Object.keys(data).forEach(function (k) {
            if (!["SUPPORT_USERS", "SUPPORT_TOP"].includes(k)) {
              localStorage.setItem(k, data[k]);
            }
          });

          getAllAnswers();
          loadCategories();

          return new Blob([content], { type: 'text/json' })
        });
      });
    });
    return new Blob(["Imported"], { type: 'text/json' })
  }

}










