"use client"

import { 
  Card,
  Metric, 
  Text 
} from "@tremor/react"

type Props = {
  color?: string
  metric: string
  title: string
}

export default function StatCard({
  color,
  metric,
  title
}: Props) {
  return (
    <Card
      decoration="top"
      decorationColor={color}
    >
      <Text>{title}</Text>
      <Metric
        dangerouslySetInnerHTML={{ __html: metric }}
      />
    </Card>
  )
}
