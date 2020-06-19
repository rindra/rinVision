import CardType from './card_type';
import button_only from './button_only';
export default class shortcuts_health_goals_selector extends CardType {
    constructor(type, id, homepage) {
        super(type, id);
        this.homepage = homepage;
    }
    init(card, container, home) {
        return new Promise((resolve, reject) => {
            super.init(card, container, home).then(status => {
                return this.init_nav(status, card, container, home)
            }).then(status => {
                resolve(status);
            }).catch(e => console.log(e));
        })
    }
    init_nav(status, card, container, home) {
        return new Promise((resolve, reject) => {
            container.querySelectorAll(`[data-id=${this.id}] .selection-button`).forEach(button => button.onclick = e => {
                button.classList.contains('selected') ? button.classList.remove('selected') : button.classList.add('selected');
            });
            container.querySelector(`[data-id=${this.id}] .cancel-button`).onclick = () => {
                this.homepage.init(home, 'more').catch(e => console.log(e));
            }
            container.querySelector(`[data-id=${this.id}] .update-button`).onclick = () => {
                this.homepage.init(home, 'more').catch(e => console.log(e));
            }
            resolve(status);
        })
    }
};
