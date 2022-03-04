import wait from "wait";

export default async function delayTransition(ms) {
  let flag = false;

  let milliseconds = ms;

  if (typeof ms === "number") {
    milliseconds = ms.toString();
  } else if (typeof ms === "string") {
    milliseconds = ms.toString().replace(/\D/g, "");
  } else {
    milliseconds = ms;
  }

  await wait(milliseconds);

  flag = true;

  return flag;
}
