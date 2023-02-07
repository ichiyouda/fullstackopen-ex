async function fn1() {
  await fn2()
  console.log(1)
  console.log(2)
}

const fn2 = async () => {
  const res = await Math.pow(4, 100)
  console.log(res)
}

fn1()
console.log(3)