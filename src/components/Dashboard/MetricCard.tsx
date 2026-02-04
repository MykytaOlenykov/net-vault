import { Card, Stack, Text, ThemeIcon } from "@mantine/core";
import type { Metric } from "./types";
interface MetricCardProps {
  metric: Metric;
}
export default function MetricCard({
  metric: { label, value, icon: Icon, color },
}: MetricCardProps) {
  return (
    <Card padding="lg" radius="md" h="100%" maw={"80%"}>
      <Stack h="100%" justify="space-between">
        <ThemeIcon color={color} variant="light" size="32px">
          <Icon size={20} />
        </ThemeIcon>
        <Text size="md" mb={6}>
          {label}
        </Text>
        <Text size="xl" c="dimmed" fw={600}>
          {value}
        </Text>
      </Stack>
    </Card>
  );
}
