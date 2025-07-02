/* eslint-disable @next/next/no-img-element */
import {
  Group,
  Burger,
  Container,
  Stack,
  Transition,
  Paper,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState, useEffect } from 'react';
import classes from './HeaderMenu.module.css';
import Link from 'next/link';

const links = [
  { link: '/', label: 'Horoscopes' },
  { link: '/tarot', label: 'AI Tarot' },
  { link: '/', label: 'Compatibility' },
  { link: '/style', label: 'Style Guide' },
  { link: '/cosmickingdom', label: 'Cosmic Kingdom' },
];

export function HeaderMenu() {
  const [opened, { toggle }] = useDisclosure(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const items = links.map((link) => (
    <Link key={link.label} href={link.link} className={classes.link}>
      {link.label}
    </Link>
  ));

  const mobileMenu = (
    <Transition mounted={opened} transition="pop-top-right" duration={200} timingFunction="ease">
      {(styles) => (
        <Paper className={classes.dropdown} style={styles}>
          <div className={classes.closeButton}>
            <Burger
              opened={opened}
              onClick={toggle}
              size="sm"
              aria-label="Close menu"
              color="#e63946"
            />
          </div>

          <Stack gap="sm">
            {links.map((link) => (
              <a
                key={link.link}
                href={link.link}
                className={classes.link}
                onClick={toggle}
              >
                {link.label}
              </a>
            ))}
          </Stack>
        </Paper>
      )}
    </Transition>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2 cosmic-glass' : 'py-4 bg-transparent'
      }`}
    >
      <Container size="xl">
        <div className={classes.inner}>
          <Link href="/" className="flex items-center">
            <img src="/logo.png" alt="logo" className="h-10" />
          </Link>

          <Group gap={25} visibleFrom="sm">
            {items}
          </Group>

          <Burger
            opened={opened}
            onClick={toggle}
            size="sm"
            hiddenFrom="sm"
            aria-label="Toggle menu"
            color="#fff"
          />

          {mobileMenu}
        </div>
      </Container>
    </header>
  );
}
