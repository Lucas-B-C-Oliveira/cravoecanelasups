import { CardContainer } from "../checkout/components/CardContainer";
import { Identification } from "../checkout/components/IdentificationContainer";
import { Login } from "../checkout/components/LoginContainer";
import { Register } from "../checkout/components/Register";

export default async function SigninAndSignup() {
  return (
    <>
      {/* @ts-expect-error -> Async Server Component */}
      <CardContainer title="Identificação">
        <div className={"flex bg-yellow w-[100rem]"}>
          <Login />
          <Register />
        </div>
      </CardContainer>
    </>
  );
}
