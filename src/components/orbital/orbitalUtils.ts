
import { TimelineItem } from "./types";

export const calculateNodePosition = (
  index: number,
  total: number,
  rotationAngle: number,
  centerOffset: { x: number; y: number }
) => {
  const angle = ((index / total) * 360 + rotationAngle) % 360;
  const radius = 200;
  const radian = (angle * Math.PI) / 180;

  const x = radius * Math.cos(radian) + centerOffset.x;
  const y = radius * Math.sin(radian) + centerOffset.y;

  const zIndex = Math.round(100 + 50 * Math.cos(radian));
  const opacity = Math.max(
    0.4,
    Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
  );

  return { x, y, angle, zIndex, opacity };
};

export const getRelatedItems = (
  itemId: number,
  timelineData: TimelineItem[]
): number[] => {
  const currentItem = timelineData.find((item) => item.id === itemId);
  return currentItem ? currentItem.relatedIds : [];
};

export const isRelatedToActive = (
  itemId: number,
  activeNodeId: number | null,
  timelineData: TimelineItem[]
): boolean => {
  if (!activeNodeId) return false;
  const relatedItems = getRelatedItems(activeNodeId, timelineData);
  return relatedItems.includes(itemId);
};
