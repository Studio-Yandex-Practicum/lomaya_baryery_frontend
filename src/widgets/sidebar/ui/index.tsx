import React, { useMemo, useState } from 'react';
import cn from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import type { To } from 'react-router-dom';
import { ChevronRightIcon, TIcons } from 'shared/ui-kit/icons';
import * as Icons from 'shared/ui-kit/icons';
import { useStore } from 'effector-react';
import { shiftModel } from 'entities/shift';
import { viewerModel } from 'entities/viewer';
import styles from './styles.module.css';

interface ISideBarAccordion {
  title: string;
  icon: keyof TIcons;
  expandOnMount?: boolean;
  list?: Array<{
    title: string;
    to: To;
  }>;
  to?: To;
}

const SideBarAccordion: React.FC<ISideBarAccordion> = ({
  title,
  icon,
  to,
  list,
  expandOnMount,
}) => {
  const [disclosed, setToggleDisclose] = useState(expandOnMount);

  const paths = list ? list.map((item) => item.to) : [to];
  const pathTo = paths && paths.length > 1 ? null : paths[0];
  const branch = useLocation().pathname;
  const isCurrentBranch = paths[0] === branch;

  const handleToggle = () => {
    setToggleDisclose((initState) => !initState);
  };

  const RenderIcon = icon && Icons[icon];

  if (list && list.length > 1) {
    return (
      <ul className={cn(styles.accordion, 'list', 'p-0')}>
        <button onClick={handleToggle} className={styles.accordion__button}>
          <RenderIcon
            color={isCurrentBranch ? 'blue-dark' : 'gray-dark'}
            className={styles.accordion__buttonIcon}
          />
          <span
            className={cn(
              'text',
              'text_type_main-medium',
              styles.accordion__text,
              {
                [styles.accordion__text_active]: isCurrentBranch,
              }
            )}
          >
            {title}
          </span>
          <ChevronRightIcon
            className={cn(styles.accoridon__buttonChevron, {
              [styles.accordion__buttonChevron_rotated]: disclosed,
            })}
            color={isCurrentBranch ? 'blue-dark' : 'gray-dark'}
          />
        </button>
        {disclosed
          ? list.map((link) => (
              <li
                className={styles.accordion__listItemWrapper}
                key={link.title}
              >
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      styles.accordion__listItem,
                      {
                        [styles.accordion__listItem_active]: isActive,
                      },
                      'text',
                      'text_type_main-medium'
                    )
                  }
                >
                  {link.title}
                </NavLink>
              </li>
            ))
          : null}
      </ul>
    );
  }
  return (
    <li>
      <NavLink to={pathTo as To} className={styles.accordion__button}>
        <RenderIcon
          color={isCurrentBranch ? 'blue-dark' : 'gray-dark'}
          className={styles.accordion__buttonIcon}
        />
        <span
          className={cn(
            'text',
            'text_type_main-medium',
            styles.accordion__text,
            {
              [styles.accordion__text_active]: isCurrentBranch,
            }
          )}
        >
          {title}
        </span>
      </NavLink>
    </li>
  );
};

export const SideBar = () => {
  const startedShift = useStore(shiftModel.$startedShift);

  const preparingShift = useStore(shiftModel.$preparingShift);

  const viewer = useStore(viewerModel.$viewer);

  const shiftsList = useMemo(() => {
    const list: ISideBarAccordion['list'] = [
      { title: 'Все', to: '/shifts/all' },
    ];

    if (startedShift) {
      list.push({ title: 'Текущая', to: '/shifts/started' });
    }

    if (preparingShift) {
      list.push({ title: 'Новая', to: '/shifts/preparing' });
    }

    return list;
  }, [startedShift, preparingShift]);

  const { pathname } = useLocation();

  const initRoute = pathname === '/' ? 'shifts' : pathname.split('/', 2)[1];

  return (
    <ul className={cn(styles.sidebar, 'm-0', 'p-0', 'list')}>
      <SideBarAccordion
        title="Смены"
        expandOnMount={initRoute === 'shifts'}
        list={shiftsList}
        icon="CalendarIcon"
      />
      <SideBarAccordion
        title="Заявки на участие"
        expandOnMount={initRoute === 'requests'}
        list={[
          { title: 'Активные', to: '/requests/pending' },
          { title: 'Рассмотренные', to: '/requests/realized' },
        ]}
        icon="NoteEditIcon"
      />
      <SideBarAccordion
        title="Участники проекта"
        expandOnMount={initRoute === '/members/all'}
        list={[{ title: 'Все', to: '/members/all' }]}
        icon="UsersIcon"
      />
      <SideBarAccordion
        title="Отчёты участников"
        expandOnMount={initRoute === 'reports'}
        list={[
          { title: 'Ждут проверки', to: '/reports/reviewing' },
          { title: 'Проверенные', to: '/reports/realized' },
          { title: 'Отклонённые', to: '/reports/declined' },
        ]}
        icon="FileCheckIcon"
      />
      {viewer?.role === 'administrator' ? (
        <SideBarAccordion
          title="Администраторы"
          expandOnMount={initRoute === 'admins'}
          list={[
            { title: 'Список', to: '/admins/members' },
            { title: 'Приглашения', to: '/admins/invitations' },
          ]}
          icon="ShieldIcon"
        />
      ) : null}

      <SideBarAccordion title="Задания" to="/tasks/all" icon="NotebookIcon" />
    </ul>
  );
};
