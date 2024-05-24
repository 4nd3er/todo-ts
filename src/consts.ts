export const TODO_FILTERS = {
    ALL : 'all',
    ACTIVE: 'active',
    COMPLETED: 'completed',
} as const
// ? En este caso la propiedad const, no significa que sea constantes
// ? Sino que son datos de solo lectura y no se pueden modificar

export const FILTER_BUTTONS = {
    [TODO_FILTERS.ALL] : {
        literal: 'todos',
        href: `/?filter=${TODO_FILTERS.ALL}`
    },
    [TODO_FILTERS.ACTIVE] : {
        literal: 'Activos',
        href: `/?filter=${TODO_FILTERS.ACTIVE}`
    },
    [TODO_FILTERS.COMPLETED] : {
        literal: 'Completados',
        href: `/?filter=${TODO_FILTERS.COMPLETED}`
    },
} as const;