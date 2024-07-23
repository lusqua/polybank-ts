import { graphql } from "relay-runtime";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { loadQuery } from "react-relay";

import { FormEvent, useState } from "react";
import { RelayEnvironment } from "../RelayEnvironment";
// find a account by id
const LoginQuery = graphql`
  query loginQuery($email: String!) {
    login(email: $email) {
      name
      balance
    }
  }
`;

export default function Login() {
  // const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const queryReference = loadQuery(RelayEnvironment, LoginQuery, { email });
    queryReference.dispose();
    console.log(queryReference);
  };

  return (
    <div className="w-screen h-full flex flex-col justify-center align-center p-2">
      <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
        <Card className="w-1/3 mx-auto p-2">
          <CardHeader>
            <h1 className="text-2xl">Login</h1>
            <p>Entre com seu email</p>
          </CardHeader>
          <CardContent>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Endereço de email da sua conta"
              onChange={(e) => setEmail(e.target.value)}
            />
          </CardContent>
          <CardFooter className="mt-2 flex justify-end ">
            <Button type="submit" className="w-32 h-8">
              Login
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
