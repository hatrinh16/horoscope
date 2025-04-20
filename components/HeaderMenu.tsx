/* eslint-disable @next/next/no-img-element */
import { Menu, Group, Center, Burger, Container, Stack, Transition, Paper } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import classes from './HeaderMenu.module.css';
import { colors } from '@mui/material';

const links = [
  {
    link: '#1',
    label: 'Horoscopes',
    links: [
      { link: '/', label: 'Daily Horoscopes' },
      { link: '', label: 'Love Horoscopes' },
      { link: '', label: 'Career Horoscopes' },
      { link: '', label: 'Finance Horoscope' },
      { link: '', label: 'Romance Horoscope' },
    ],
  },
  {
    link: '#2',
    label: 'Zodiac',
    links: [
      { link: '', label: 'Sun Sign' },
      { link: '', label: 'Moon Sign' },
      { link: '', label: 'Rising Sign' },
      { link: '', label: 'Zodiac Signs' },
    ],
  },
  { link: '/tarot', label: 'AI Tarot' },
  { link: '/compatibility', label: 'Compatibility' },
];

export function HeaderMenu() {
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => {
    // Dropdown menu
    if (link.links) {
      const dropdownItems = link.links.map((item) => (
        <Menu.Item key={item.link} component="a" href={item.link}>
          {item.label}
        </Menu.Item>
      ));

      return (
        <Menu
          key={link.label}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(e) => e.preventDefault()} // Only prevent for parent dropdowns
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{dropdownItems}</Menu.Dropdown>
        </Menu>
      );
    }

    // Normal link
    return (
      <a key={link.label} href={link.link} className={classes.link}>
        {link.label}
      </a>
    );
  });

  const mobileMenu = (
    <Transition mounted={opened} transition="pop-top-right" duration={200} timingFunction="ease">
      {(styles) => (
        <Paper className={classes.dropdown} style={styles}>
          {/* Floating X/Close button */}
          <div className={classes.closeButton}>
            <Burger
              opened={opened}
              onClick={toggle}
              size="sm"
              aria-label="Close menu"
              color="#e63946"
            />
          </div>
  
          {/* Actual menu content */}
          <Stack gap="sm">
            {links.map((link) => {
              if (link.links) {
                return (
                  <div key={link.label}>
                    <div className={classes.linkLabel}>{link.label}</div>
                    <Stack pl="md" gap={4}>
                      {link.links.map((item) => (
                        <a
                          key={item.link}
                          href={item.link}
                          className={classes.link}
                          onClick={toggle}
                        >
                          {item.label}
                        </a>
                      ))}
                    </Stack>
                  </div>
                );
              }
  
              return (
                <a
                  key={link.link}
                  href={link.link}
                  className={classes.link}
                  onClick={toggle}
                >
                  {link.label}
                </a>
              );
            })}
          </Stack>
        </Paper>
      )}
    </Transition>
  );
  
  
  return (
    <header className={classes.header}>
      <Container size="md">
        <div className={classes.inner}>
          <Group gap={25} visibleFrom="sm">
            {items}
          </Group>
          <Burger
            opened={opened}
            onClick={toggle}
            size="sm"
            hiddenFrom="sm"
            aria-label="Toggle menu"
            color={opened ? '#fff' : '#fff'}
          />
          {mobileMenu}
        </div>
      </Container>
    </header>
  );
}
