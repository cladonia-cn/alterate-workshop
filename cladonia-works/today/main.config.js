export default {
    name: "Today",
    author: "Cladonia",
    previewImage: "./preview.png",
    widgets: [
        {
            id: 'today-day',
            size: '3x2',
            config: {
                title: '今天'
            },
            style: {
                '.widget-content': {
                    backgroundImage: "url('https://dailybing.com/api/v1/MBL/')",
                    backgroundSize: 'cover',
                    flexDirection: 'column',
                    justifyContent: 'end',
                    alignItems: 'start',
                },
                '.widget-title': {
                    color: 'var(--normal-950)',
                    fontSize: '24px',
                    textAlign: 'start',
                    padding: '10px',
                },
                '.widget-day-container': {
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '4px',
                    margin: '10px 0px 2px 0px',
                    justifyContent: 'flex-start',
                },
                '.day': {
                    fontSize: '48px',
                    textAlign: 'start',
                    margin: '0',
                },
                '.weekday': {
                    fontSize: '16px',
                    textAlign: 'start',
                    margin: '0',
                    color: 'white',
                    opacity: '0.75',
                }
            },
            render(container) {
                const widget = document.createElement('div');
                const [rows, cols] = this.size.split('x').map(Number);

                widget.className = `widget size${rows}x${cols}`;

                const today = new Date();
                const day = today.getDate(); // 获取今天的天数
                const dayStr = day.toString();
                const weekday = today.getDay();

                // 设置不同的 data-i18n 值
                const weekdayI18nKeys = [
                    'widget.weekday.sunday',
                    'widget.weekday.monday',
                    'widget.weekday.tuesday',
                    'widget.weekday.wednesday',
                    'widget.weekday.thursday',
                    'widget.weekday.friday',
                    'widget.weekday.saturday'
                ];

                const svgElements = dayStr.split('').map(num => {
                    return `<div class="type-serif-svg num${num}"></div>`;
                }).join('');
                const svgElementsOverlay = dayStr.split('').map(num => {
                    return `<div class="type-serif-svg num${num} overlay"></div>`;
                }).join('');

                widget.innerHTML = `
                    <div class="widget-content">
                        <div class="weekday" data-i18n="${weekdayI18nKeys[weekday]}"></div>
                        <span class="absolute-container">
                            <div class="widget-day-container" style="mix-blend-mode:overlay; position: absolute;">
                                ${svgElementsOverlay}
                            </div>
                            <div class="widget-day-container">
                                ${svgElements}
                            </div>
                        </span>
                    </div>
                `;

                Object.entries(this.style).forEach(([selector, styles]) => {
                    const elements = widget.querySelectorAll(selector);
                    elements.forEach(element => {
                        Object.assign(element.style, styles);
                    });
                });

                container.appendChild(widget);
            }
        }
    ]
};
