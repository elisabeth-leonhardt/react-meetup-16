This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Introduction

Repository for the edition 16 of the React Meetup in Leipzig https://www.meetup.com/reactjs-meetup-leipzig/ taking place on the 15th of February 2024.

The examples are thought to be as self-contained as possible and the code for every example is mostly colocated in one file - keep in mind that this is not the recommended structure for a bigger application.

Any feedback is very much appreciated. The best way to reach out to me is over [LinkedIn](https://www.linkedin.com/in/elisabeth-l/) or [Twitter](https://twitter.com/FrontendDevEli).


## Start the frontend project 
Install the dependencies:

```bash
npm i
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Start json-server
Also, for the mutation part to work correctly, start json-server:

```bash
npm run json-server
```

The exposed endpoints will be visible at [http://localhost:8001](http://localhost:8001)

## Troubleshooting

I have used node v20 to create this project and didn't make huge changes to the structure. If you encounter issues, you might have forgotten to start json-server. Otherwise, the Next.js docs should help you.

If you still encounter issues, you most likely didn't star this repository. ⭐ If you star it, everything will work immediately. 😝