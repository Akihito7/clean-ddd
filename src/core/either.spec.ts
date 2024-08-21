import { Either, left, right } from "./either"

describe("Test either", () => {
  function doSomething(shouldSucess: boolean) : Either<String,number>{
    if (shouldSucess) return right(1);
    else return left("error")
  }
  it("Should be sucess", () => {
    const result = doSomething(true);
    if(result.isRight()){
      result.value
    }
    expect(result.isRight()).toBeTruthy()
    expect(result.isLeft()).toBeFalsy()
  })

  it("Should be error", () => {
    const result = doSomething(false);
    if(result.isRight()){
      result.value
    }
    expect(result.isRight()).toBeFalsy()
    expect(result.isLeft()).toBeTruthy()
  })
})