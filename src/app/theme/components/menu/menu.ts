import { Menu } from './menu.model';

export const verticalMenuItems = [
    new Menu(1, 'Appraisal', null, null, 'circle', null, true, 0),
    new Menu(2, 'Organization Goals', '/appraisal/organization-goals', null, 'circle', null, false, 1),
    new Menu(3, 'Review Periods', '/appraisal/review-periods', null, 'calendar', null, false, 1),
    new Menu(4, 'Employee Objectives', '/appraisal/objectives', null, 'circle', null, false, 1)
];

export const horizontalMenuItems = [];
