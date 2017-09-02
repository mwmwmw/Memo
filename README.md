# Memo
The smallest event system imaginable.

```
let memo = new Memo();

memo.on("thisEvent", (message)=>{ console.log(`thisEvent ${message}`) });

memo.trigger("thisEvent", "Triggered");

// thisEvent Triggered

memo.off("thisEvent");

memo.trigger("thisEvent", "Triggered");

// nothing happens

```
