import CardType from './card_type';
export default class fixed_header extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
    this.time = 0;
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      card.dateTime = home.config.luxon.now
      card.date_updated = home.config.manual_tracking.calendar[this.time].time
      card.hasDone = (card.cta == 'Done');
      card.today = home.config.luxon.now.toFormat('DDDD');
      let buildCenterToday = function () {
        const weekdays = [];
        let startDay = card.dateTime.minus({
          days: 4
        });
        let nextDay = startDay.plus({
          days: 1
        });
        Array.from({length: 7}, () => {
          weekdays.push(nextDay);
          nextDay = nextDay.plus({
            days: 1
          });
        })
        weekdays.forEach(day => {
          console.log(day.toFormat('MMM Do'));
        })
        return weekdays;
      }
      card.dates = buildCenterToday();

      let formatWeekDayView = function () {
        const weekdays = [];
        card.dates.forEach(date => {
          weekdays.push(date.toFormat('ccccc'));
        });
        return weekdays;
      }
      card.dates_weekday = formatWeekDayView();

      let formatDateNum = function () {
        const weekdays = [];
        card.dates.forEach(date => {
          weekdays.push(date.toFormat('d'));
        });
        return weekdays;
      }
      card.dates_daynum = formatDateNum();

      super.init(card, container, home).then(status => {
        return this.init_nav(status, card, container, home)
      }).then(status => {
        resolve(status);
      }).catch(e => console.log(e));
    })
  }
  update(card, container, home, activities) {
    card.dateTime = home.config.luxon.now
    card.date_updated = home.config.manual_tracking.calendar[this.time].time
    container.querySelector(`[data-id=${this.id}] .date`).innerHTML = home.config.manual_tracking.calendar[this.time].time
    TweenMax.set(document.querySelectorAll('.circle'), {
      x: 0
    })
    TweenMax.set(document.querySelectorAll('.bar'), {
      width: 1
    })
    container.querySelectorAll(`.amount`).forEach(a => a.innerHTML = 0);
    activities.forEach(activity => {
      container.querySelector(`[data-activity-category=${activity}] .total`).innerHTML = home.config.manual_tracking.calendar.filter(d => d.time == container.querySelector(`.date`).innerHTML)[0][activity]
      container.querySelector(`[data-activity-category=${activity}] .label`).innerHTML = 'Steps count so far: ' + home.config.manual_tracking.calendar.filter(d => d.time == container.querySelector(`.date`).innerHTML)[0][activity]
    })
  }
  init_nav(status, card, container, home) {
    return new Promise((resolve, reject) => {
      let activities = ['steps', 'food', 'sleep']
      let index = 0;
      container.querySelectorAll(`[data-id=${this.id}] .weekday-text`).forEach(date => {
        index == 3 ? date.classList.add('is-today') : null;
        index++;
      });

      let oindex = 0;
      container.querySelectorAll(`[data-id=${this.id}] .day-text`).forEach(date => {
        oindex == 3 ? (date.classList.add('today'), date.classList.remove('day-text')) : null;
        oindex >= 4 ? date.classList.add('disabled') : null;
        oindex++;
      });

      if (container.querySelector(`[data-id=${this.id}] .left`)) {
        container.querySelector(`[data-id=${this.id}] .left`).onclick = e => {
          if (this.time + 1 < home.config.manual_tracking.calendar.length) {
            ++this.time
            this.update(card, container, home, activities)

          }
        }
      }
      if (container.querySelector(`[data-id=${this.id}] .right`)) {
        container.querySelector(`[data-id=${this.id}] .right`).onclick = e => {
          if (this.time - 1 > -1) {
            --this.time
            this.update(card, container, home, activities)
          }
        }
      }
      container.querySelector(`[data-id=${this.id}] .cancel`).onclick = e => {
        if (card.cta == 'Done') {
          home.config.skin.persona[`blog_${home.config.skin.persona.time}`] = this.removeDuplicates(this.flatten(home.config.target_cards));
          this.homepage.init(home, 'blog')
            .catch(e => console.log(e));
        } else {
          this.homepage.init(home)
            .catch(e => console.log(e));
        }
      }
      if (container.querySelector(`[data-id=${this.id}] .done`)) {
        container.querySelector(`[data-id=${this.id}] .done`).onclick = e => {
          home.config.skin.persona[`blog_${home.config.skin.persona.time}`] = this.removeDuplicates(this.flatten(home.config.target_cards));
          this.homepage.init(home, 'blog')
            .catch(e => console.log(e));
        }
        container.querySelectorAll(`[data-id=${this.id}] .answer`).forEach(a => a.onclick = e => {
          container.querySelectorAll(`[data-id=${this.id}] .answer`).forEach(b => b.classList.remove('on'));
          e.currentTarget.classList.add('on');
          home.config.manual_tracking.reminder_time = e.currentTarget.getAttribute('data-reminder-time');
        })
      }

      resolve(status);
    })
  }
};
