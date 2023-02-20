import React, { useMemo, useState } from 'react';
import cn from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import type { To } from 'react-router-dom';
import { useStore } from 'effector-react';
import { ChevronRightIcon, TIcons } from '../../../../shared/ui-kit/icons';
import * as Icons from '../../../../shared/ui-kit/icons';
import { shiftModel } from '../../../shift';
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
  const branch = useLocation().pathname.split('/')[1];
  const isCurrentBranch = paths.some((path) =>
    path?.toString().includes(branch)
  );

  const handleToggle = () => {
    setToggleDisclose((initState) => !initState);
  };

  const RenderIcon = icon && Icons[icon];

  if (list) {
    return (
      <ul className={cn(styles.accordion, 'list', 'p-0')}>
        <button onClick={handleToggle} className={styles.accordion__button}>
          <RenderIcon
            type={isCurrentBranch ? 'link-active' : 'link'}
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
            type={isCurrentBranch ? 'link-active' : 'link'}
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
      <NavLink to={to as To} className={styles.accordion__button}>
        <RenderIcon
          type={isCurrentBranch ? 'link-active' : 'link'}
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
          { title: 'Рассмотренные', to: '/requests/considered' },
        ]}
        icon="NoteEditIcon"
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
    </ul>
  );
};
