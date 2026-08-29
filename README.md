# 🎂 Сайт-поздравление для Ангелины

Статический сайт с обратным отсчётом до дня рождения — **31 августа 2026, 00:00 по времени UTC+9** (Токио/Осака). Никакой сборки не требуется: `index.html`, `style.css`, `script.js` — три файла, которые можно открыть напрямую в браузере или выложить на любой хостинг.

Дата отсчёта задана в `script.js`:
```js
const TARGET_DATE = new Date("2026-08-31T00:00:00+09:00");
```
Если нужно изменить дату/время — поменяйте эту строку.

---

## Быстрая проверка локально

Просто откройте `index.html` двойным кликом в браузере — сайт полностью статический и работает без сервера.

---

## 🚀 Самый быстрый деплой (без регистрации, 30 секунд)

**Netlify Drop**
1. Откройте https://app.netlify.com/drop
2. Перетащите папку `d:\hb` (со всеми тремя файлами) прямо в окно браузера
3. Через несколько секунд получите готовую ссылку вида `https://random-name.netlify.app`

Готово — сайт уже в интернете, ссылку можно отправлять.

---

## Другие быстрые варианты

### GitHub Pages (если уже есть GitHub)
```bash
git init
git add index.html style.css script.js
git commit -m "Happy birthday site"
git branch -M main
git remote add origin https://github.com/<ваш-логин>/<репозиторий>.git
git push -u origin main
```
Затем: Settings → Pages → Source: `main` / `root` → Save.
Сайт появится на `https://<ваш-логин>.github.io/<репозиторий>/`.

### Vercel
```bash
npm i -g vercel
vercel
```
Следуйте подсказкам в консоли — деплой займёт около минуты, ссылка выводится сразу.

### Cloudflare Pages
1. https://dash.cloudflare.com → Workers & Pages → Create → Pages → Upload assets
2. Перетащите те же три файла
3. Готовая ссылка появится сразу после загрузки

---

## Деплой на свой сервер (VPS / хостинг)

Файлы полностью статические, поэтому подходит любой веб-сервер.

**Через nginx:**
```bash
scp index.html style.css script.js user@your-server:/var/www/hb-angelina/
```
Конфиг nginx:
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/hb-angelina;
    index index.html;
}
```
```bash
sudo nginx -t && sudo systemctl reload nginx
```

**Через любой shared-хостинг:** просто загрузите три файла в `public_html` (или аналогичную корневую папку сайта) через FTP/файловый менеджер — сайт заработает сразу.

---

## Структура проекта
```
d:\hb\
├── index.html   — разметка страницы
├── style.css    — оформление и анимации
├── script.js    — логика обратного отсчёта, конфетти, парящие декорации
└── README.md    — эта инструкция
```
