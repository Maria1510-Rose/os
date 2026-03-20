export interface DiskRequest {
  track: number;
  order: number;
}

export interface SimulationResult {
  sequence: number[];
  totalMovement: number;
  steps: { track: number; movement: number }[];
}

export function scanAlgorithm(
  requests: number[],
  head: number,
  diskSize: number,
  direction: 'left' | 'right'
): SimulationResult {
  let totalMovement = 0;
  const sequence: number[] = [head];
  const steps: { track: number; movement: number }[] = [{ track: head, movement: 0 }];
  
  const sortedRequests = [...requests].sort((a, b) => a - b);
  const left = sortedRequests.filter(r => r < head).sort((a, b) => b - a);
  const right = sortedRequests.filter(r => r >= head).sort((a, b) => a - b);

  let currentHead = head;

  if (direction === 'right') {
    // Service right
    for (const r of right) {
      const movement = Math.abs(r - currentHead);
      totalMovement += movement;
      sequence.push(r);
      steps.push({ track: r, movement });
      currentHead = r;
    }
    // Go to end if there are requests on the left
    if (left.length > 0) {
      const end = diskSize - 1;
      if (currentHead !== end) {
        const movement = Math.abs(end - currentHead);
        totalMovement += movement;
        sequence.push(end);
        steps.push({ track: end, movement });
        currentHead = end;
      }
      // Service left
      for (const r of left) {
        const movement = Math.abs(r - currentHead);
        totalMovement += movement;
        sequence.push(r);
        steps.push({ track: r, movement });
        currentHead = r;
      }
    }
  } else {
    // Service left
    for (const r of left) {
      const movement = Math.abs(r - currentHead);
      totalMovement += movement;
      sequence.push(r);
      steps.push({ track: r, movement });
      currentHead = r;
    }
    // Go to start if there are requests on the right
    if (right.length > 0) {
      const start = 0;
      if (currentHead !== start) {
        const movement = Math.abs(start - currentHead);
        totalMovement += movement;
        sequence.push(start);
        steps.push({ track: start, movement });
        currentHead = start;
      }
      // Service right
      for (const r of right) {
        const movement = Math.abs(r - currentHead);
        totalMovement += movement;
        sequence.push(r);
        steps.push({ track: r, movement });
        currentHead = r;
      }
    }
  }

  return { sequence, totalMovement, steps };
}

export function fcfsAlgorithm(requests: number[], head: number): SimulationResult {
  let totalMovement = 0;
  const sequence: number[] = [head];
  const steps: { track: number; movement: number }[] = [{ track: head, movement: 0 }];
  let currentHead = head;

  for (const r of requests) {
    const movement = Math.abs(r - currentHead);
    totalMovement += movement;
    sequence.push(r);
    steps.push({ track: r, movement });
    currentHead = r;
  }

  return { sequence, totalMovement, steps };
}

export function sstfAlgorithm(requests: number[], head: number): SimulationResult {
  let totalMovement = 0;
  const sequence: number[] = [head];
  const steps: { track: number; movement: number }[] = [{ track: head, movement: 0 }];
  let currentHead = head;
  let remaining = [...requests];

  while (remaining.length > 0) {
    let closestIndex = 0;
    let minDistance = Math.abs(remaining[0] - currentHead);

    for (let i = 1; i < remaining.length; i++) {
      const distance = Math.abs(remaining[i] - currentHead);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }

    const next = remaining[closestIndex];
    totalMovement += minDistance;
    sequence.push(next);
    steps.push({ track: next, movement: minDistance });
    currentHead = next;
    remaining.splice(closestIndex, 1);
  }

  return { sequence, totalMovement, steps };
}
