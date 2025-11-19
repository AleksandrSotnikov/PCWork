function loadUrl() {
    const input = document.getElementById('urlInput');
    const url = input.value.trim();
    
    if (!url) {
        alert('Пожалуйста, введите URL');
        return;
    }
    
    // Добавляем http:// если протокол не указан
    let fullUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        fullUrl = 'http://' + url;
    }
    
    const frame = document.getElementById('contentFrame');
    const welcomeScreen = document.getElementById('welcomeScreen');
    const currentTitle = document.getElementById('currentTitle');
    const currentUrl = document.getElementById('currentUrl');
    
    // Показываем iframe и скрываем приветственный экран
    welcomeScreen.style.display = 'none';
    frame.style.display = 'block';
    
    // Загружаем URL
    frame.src = fullUrl;
    
    // Обновляем заголовок
    currentTitle.textContent = 'Загрузка...';
    currentUrl.textContent = fullUrl;
    
    // Обработка загрузки
    frame.onload = function() {
        currentTitle.textContent = 'Приложение загружено';
    };
    
    frame.onerror = function() {
        currentTitle.textContent = 'Ошибка загрузки';
        alert('Не удалось загрузить указанный URL. Проверьте, что приложение запущено.');
    };
}

function loadQuickUrl(url) {
    const input = document.getElementById('urlInput');
    input.value = url;
    loadUrl();
}

function toggleFullscreen() {
    const container = document.getElementById('iframeContainer');
    
    if (!document.fullscreenElement) {
        container.requestFullscreen().catch(err => {
            alert(`Ошибка при переходе в полноэкранный режим: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

function reloadFrame() {
    const frame = document.getElementById('contentFrame');
    if (frame.src) {
        frame.src = frame.src;
    }
}

// Обработка Enter в поле ввода
document.getElementById('urlInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        loadUrl();
    }
});

// Обработка выхода из полноэкранного режима
document.addEventListener('fullscreenchange', function() {
    const btn = document.querySelector('.header-right button');
    if (document.fullscreenElement) {
        btn.innerHTML = '<span class="icon">✕</span> Выйти';
    } else {
        btn.innerHTML = '<span class="icon">⛶</span> Полный экран';
    }
});