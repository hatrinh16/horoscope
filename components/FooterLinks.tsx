import { Container, Group, ActionIcon, rem, Text } from '@mantine/core';
import { IconBrandX, IconBrandThreads, IconBrandInstagram } from '@tabler/icons-react';
import classes from './FooterLinks.module.css';

export function FooterLinks() {
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Text size='sm' c="dimmed">
        © 2024 DailyAstro. All rights reserved.
        </Text>
        <Group gap={0} className={classes.links} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandX style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandThreads style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}