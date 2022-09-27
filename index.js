function injectLoadAllObjectsAndFields() {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('loadAllObjectsAndFields.js');
    script.onload = () => {
        script.remove();
    };

    (document.head || document.documentElement).appendChild(script);
}

injectLoadAllObjectsAndFields();