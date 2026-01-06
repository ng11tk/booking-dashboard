# trek booking dashboard

○ Setup steps

    client side

        1. created 3 pages for forms
            - trek
            - batch
            - booking
        2. create list of treks
        3. create batches for assoicated treks
        4. make booking for treks w.r.t batches
            1. fill form details
        5. we have 4 stages for status update regarding trek booking
            1. completed - if slot is available
            2. pending - payment is not done (future)
            3. waitlist - all stots are booked, if someone cancels we can take the booking
            4. cancelled - cancel a trek booking

    server side
        1. we created modules for each table
        2. created schema for graphql
        3. create resolvers so that graphql and database can connect
            these are functions which operates the logic for database opreations
        4. in last we dockerise the whole code so that dependancy does not get mismatch

    datbase side
        tables
            1. trek
            2. batch
            3. booking

○ Tech stack used

    client -
        reactjs
        tailwindcss

    server -
        fastify
        graphql
        mongodb
        docker

○ Architectural decisions

    - for booking treks we need the other info as well like trek info and batches so we created both tables as well
    - we stored all the business logic inside the server
    - we used graphql in place of restful apis
    -
