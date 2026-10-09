import { useState } from "react";

type SignupFromProps = {
  onSignupSuccess: () => void;
};


function SignupForm({onSignupSuccess}: SignupFromProps){
        const [username, setUsername] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

        function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();

        console.log(username);
        console.log(email);
        console.log(password);

        onSignupSuccess();
        }
    
    return(
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>

      <input
        type="text"
        placeholder="Name"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />

      <input 
        type = "email" 
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        />

        <input 
        type = "password" 
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        />

      <button>Sign Up</button>
        </form>
    )
}

export default SignupForm;