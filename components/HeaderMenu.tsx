/* eslint-disable @next/next/no-img-element */
import { Menu, Group, Center, Burger, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import classes from './HeaderMenu.module.css';

const links = [
  { link: '#1', label: 'Horoscopes',
    links: [
      { link: '/', label: 'Daily Horoscopes'},
     { link: '/love', label: 'Love Horoscopes'},
     { link: '/career', label: 'Career Horoscopes'},
     { link: '/finance', label: 'Finance Horoscope'},
     { link: '/romance', label: 'Romance Horoscope'}
    ]
   },
  {
    link: '#2',
    label: 'Zodiac',
    links: [
      { link: '/sun-sign', label: 'Sun Sign' },
      { link: '/moon-sign', label: 'Moon Sign' },
      { link: '/rising-sign', label: 'Rising Sign' },
      { link: '/zodian-sign', label: 'Zodiac Signs' },
    ],
  },
  { link: '/tarot', label: 'Tarot' },
  { link: '/numerology', label: 'Numerology' },
];

export function HeaderMenu() {
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });

  return (
    <header className={classes.header}>
      <Container size ="md">
        <div className={classes.inner}>
         <Group gap={25} visibleFrom="sm">
            {items}
          </Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />

            </div>
          
      </Container>
    </header>
  );
}