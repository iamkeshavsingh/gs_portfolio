const startTyper = (function () {

    const content = document.querySelector('#content');
    const init_value = "KESHAV SINGH";

    function nextStage(text, direction) {
        if (direction == -1) {
            return text.slice(0, text.length - 1);
        }

        const next = init_value[text.length];
        return text + next;
    }

    let direction = -1;

    function updateDom(text) {
        content.innerText = text;
    }

    function startTyper() {
        let text = init_value;
        return setInterval(function () {
            text = nextStage(text, direction);
            if (text.length == 1 || text == init_value) {
                direction = direction * -1;
            }
            updateDom(text);
        }, 100);
    }

    return startTyper;

})();


const sidebar_init = (function () {
    let currentlyActive = null;
    const contentDOM = document.querySelector('.main_content');
    const qualificationDOM = document.querySelector('.qualification_wrapper');
    const cvButtonDOM = document.querySelector('.download_cv_wrapper');
    let typerIntervalRef = null;

    function showContentDom() {
        typerIntervalRef = startTyper();
        contentDOM.style.display = 'block';
        currentlyActive = contentDOM;
    }

    function showQualificationDom() {
        qualificationDOM.style.display = 'block';
        currentlyActive = qualificationDOM;
    }

    function showCvButtonDom() {
        cvButtonDOM.style.display = 'flex';
        currentlyActive = cvButtonDOM;
    }

    function clearIntervalRef() {
        if (typerIntervalRef) {
            clearInterval(typerIntervalRef);
            typerIntervalRef = null;
        }
    }

    function hideCurrentElement(element) {
        if (currentlyActive && currentlyActive !== element) {
            currentlyActive.style.display = 'none';
        }
    }

    function changeActivated(element) {
        hideCurrentElement(element);
        switch (element) {
            case contentDOM:
                if (typerIntervalRef) return;
                showContentDom();
                break;
            case qualificationDOM:
                showQualificationDom();
                clearIntervalRef();
                break;
            case cvButtonDOM: showCvButtonDom();
                clearIntervalRef();
                break;
        }
    }

    const cvAction = document.querySelector('#download_cv_action');
    const qualificationAction = document.querySelector('#qualification_action');
    const profileAction = document.querySelector('#profile_action');

    cvAction.addEventListener('click', function () {
        changeActivated(cvButtonDOM);
    });

    qualificationAction.addEventListener('click', function () {
        changeActivated(qualificationDOM);
    });

    profileAction.addEventListener('click', function () {
        changeActivated(contentDOM);
    });

    function init() {
        changeActivated(contentDOM);
        currentlyActive = contentDOM;
    }

    return init;


})();


sidebar_init();