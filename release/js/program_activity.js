import CardType from './card_type';
export default class program_activity extends CardType {
  constructor(type, id, homepage) {
    super(type, id);
    this.homepage = homepage;
    this.ways_to_earn_incentive_card = '';
    this.ways_to_earn_point_card = '';
    this.activitiesArr = '';
    this.atGlanceTitle = '';
    this.activitiesTitle = '';
    this.linkedTrackers = '';
  }
  init(card, container, home) {
    return new Promise((resolve, reject) => {
      this.init_program_activity(status, card, container, home);

      super.init(card, container, home)
        .then(status => {
          return this.init_nav(status, card, container, home)
        })
        .then(status => {
          resolve(status);
        })
        .catch(e => console.log(e));
    })
  }
  flatten(array) {
    for (let i = 0; i < array.length; Array.isArray(array[i]) && array.splice(i, 1, ...array[i]) || i++) {}
    return array;
  }
  removeDuplicates(arr) {
    let unique_array = [];
    for (let i = 0; i < arr.length; i++) {
      if (unique_array.indexOf(arr[i]) === -1) {
        unique_array.push(arr[i]);
      }
    }
    return unique_array;
  }
  init_program_activity(status, card, container, home) {
    let noActivitiesArr = home.config.target_cards.filter(e => e.type !== 'program_activity');
    if (home.config.programs[card.category].add_bg === 'true') {
      if (container.querySelector('[data-type="program_top"]').getAttribute('data-id') === noActivitiesArr[0].name) {
        container.querySelector('[data-type="program_top"]').setAttribute('data-activity', 'true');
      }
    }
    if (home.config.target_cards.filter(e => e.type === 'linked_trackers')) this.linkedTrackers = home.config.target_cards.filter(e => e.type === 'linked_trackers')[0];
    this.activitiesArr = home.config.target_cards.filter(e => e.type === 'program_activity');
    this.atGlanceTitle = home.config.target_cards.filter(e => e.type === 'separators')[0];
    this.activitiesTitle = home.config.target_cards.filter(e => e.type === 'separators')[1];
    this.ways_to_earn_point_card = home.config.ways_to_earn.ways_to_earn_point.filter(c => c.label_plan_status == 'incentive' && c.category == card.category);
    this.ways_to_earn_incentive_card = home.config.ways_to_earn.ways_to_earn_incentive.filter(c => c.type == 'todo_card' && c.category == card.category);

    if (this.activitiesArr.filter(e => e.caption_fsa === 'daily').length === 0) home.config.target_cards[0].calendar = 'no_calendar';
  }
  init_nav(status, card, container, home) {
    return new Promise((resolve, reject) => {
      this.activitiesArr.filter(pa => (pa.target || pa.cta)).forEach(pa => {
        if (container.querySelector(`[data-id="${pa.name}"]`)) {
          container.querySelector(`[data-id="${pa.name}"] .cta_button_box`).classList.add('action');
          if (!pa.cta) container.querySelector(`[data-id="${pa.name}"] .cta_button_box .cta_button`).innerHTML = 'GO';
        }
      });
      container.querySelector(`[data-id="${this.id}"]`).onclick = e => {
        let clickedProgram = home.config.target_cards.filter(e => e.name === `${this.id}`)[0];
        this.activitiesArr.splice(this.activitiesArr.indexOf(clickedProgram), 1);
        this.activitiesArr.push(clickedProgram);
        (this.activitiesTitle.title === 'ACTIVITIES') ? this.activitiesArr.unshift(this.activitiesTitle) : this.activitiesArr.unshift(this.atGlanceTitle);
        (!this.linkedTrackers) ? home.config.target_cards.splice(1, 0, this.activitiesArr) : home.config.target_cards.splice(1, 0, this.linkedTrackers);
        home.config.target_cards = this.removeDuplicates(this.flatten(home.config.target_cards));
        home.config.skin.persona[`blog_${home.config.skin.persona.time}`] = home.config.target_cards;

        if (card.target) {
          home.config.target_cards[0].status = 'completed';
          if (!card.label_plan_status) card.status = 'complete';
          if (home.config.programs[card.category]) {
            home.config.programs[card.category].points += Number(card.points);
            if (!home.config.programs[card.category].completed_activities) home.config.programs[card.category].completed_activities = [];
            home.config.programs[card.category].completed_activities.push({
              title: clickedProgram.title,
              points: clickedProgram.points
            });
            if (card.points !== null) home.config.programs[card.category].add_bg = 'true';
            if (card.points === null) home.config.programs[card.category].no_calendar = 'true';
          }
          home.config.skin.persona[`bieber_${home.config.skin.persona.time}`] = [card.target];
          this.homepage.init(home, 'bieber').then(s => console.log(s)).catch(e => console.log(e));
        }
        if (card.target_cards) {
          if (!card.label_plan_status) card.status = 'complete';
          if (!home.config.programs[card.category].completed_activities) home.config.programs[card.category].completed_activities = [];
          home.config.programs[card.category].completed_activities.push({
            title: clickedProgram.title,
            points: clickedProgram.points
          });
          if (card.points === null) home.config.programs[card.category].no_calendar = 'true';
          home.config.skin.persona[`blog_${home.config.skin.persona.time}`] = card.target_cards;
          this.homepage.init(home, 'blog')
            .catch(e => console.log(e));
        }

        if (this.ways_to_earn_incentive_card.length > 0) {
          if (this.ways_to_earn_incentive_card[0].target_cards) {
            this.ways_to_earn_incentive_card[0].status = (home.config.programs[this.ways_to_earn_incentive_card[0].category].completed_activities.length < this.ways_to_earn_incentive_card[0].target_cards.filter(b => b.type == 'program_activity').length) ? 'progress' : 'end'
          }
          if (this.ways_to_earn_incentive_card[0].target_benefit) {
            this.ways_to_earn_incentive_card[0].status = (home.config.programs[this.ways_to_earn_incentive_card[0].category].completed_activities.length < this.ways_to_earn_incentive_card[0].target_benefit.actions.filter(b => b.type == 'program_activity').length) ? 'progress' : 'end'
          }

        }
        if (this.ways_to_earn_point_card.length > 0) {
          if (this.ways_to_earn_point_card[0].target_cards) {
            this.ways_to_earn_point_card[0].status = (home.config.programs[this.ways_to_earn_point_card[0].category].completed_activities.length < this.ways_to_earn_point_card[0].target_cards.filter(b => b.type == 'program_activity').length) ? 'progress' : 'end'
          }
          if (this.ways_to_earn_point_card[0].target_benefit) {
            this.ways_to_earn_point_card[0].status = (home.config.programs[this.ways_to_earn_point_card[0].category].completed_activities.length < this.ways_to_earn_point_card[0].target_benefit.actions.filter(b => b.type == 'program_activity').length) ? 'progress' : 'end'
          }
        }
      }
      resolve(status);
    })
  }
};
