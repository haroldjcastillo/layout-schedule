# Layout-Schedule
This library allows to layout events into a calendar for visualization, it generates the slots and its coordinates to draw it in a canvas or using absolute position.

![Example](./docs/example.png)

## Example

Given this events:

```json
 [
    {
        "id": "1",
        "start": "2023-06-13T09:00:00",
        "end": "2023-06-13T09:35:00",
    },
    {
        "id": "4",
        "start": "2023-06-13T09:35:00",
        "end": "2023-06-13T10:00:00",
    }
]
```

Result

![Example](./docs/example-simple.png)

```json
[
    {
        "rows": 35,
        "cols": 1,
        "event": {
            "id": "1",
            "start": "2023-06-13T07:00:00.000Z",
            "end": "2023-06-13T07:35:00.000Z"
        },
        "rectangle": {
            "x": 0,
            "y": 540,
            "width": 1133,
            "height": 35
        }
    },
    {
        "rows": 25,
        "cols": 1,
        "event": {
            "id": "4",
            "start": "2023-06-13T07:35:00.000Z",
            "end": "2023-06-13T08:00:00.000Z"
        },
        "rectangle": {
            "x": 0,
            "y": 575,
            "width": 1133,
            "height": 25
        }
    }
]
```
