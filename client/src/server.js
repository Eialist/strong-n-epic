import { createServer, Model, hasMany } from "miragejs";

createServer({
    models: {
        user: Model.extend({
            activities: hasMany("activity"),
        }),
        activity: Model,
    },

    routes() {
        this.namespace = "api";

        this.get("/admin/users", (schema, request) => {
            return schema.users.all();
        });

        this.get("/activities", (schema, request) => {
            return schema.activities.all();
        });

        this.get("/user/:id", (schema, request) => {
            const userId = request.params.id;
            const user = schema.users.find(userId);

            return { user };
        });

        this.get("/activities/:id", (schema, request) => {
            const activityId = request.params.id;
            const activity = schema.activities.find(activityId);

            return { activity };
        });

        this.post("/users", (schema, request) => {
            let attrs = JSON.parse(request.requestBody);
            return schema.users.create(attrs);
        });

        this.post("/admin/activities", (schema, request) => {
            let attrs = JSON.parse(request.requestBody);
            return schema.activities.create(attrs);
        });

        this.post("/user/:id/bookings", (schema, request) => {
            const userId = request.params.id;
            const { activityId } = JSON.parse(request.requestBody);

            const user = schema.users.find(userId);
            const activity = schema.activities.find(activityId);

            user.update({ activities: [...user.activities.models, activity] });

            return { user };
        });

        this.delete("/user/:userId/bookings/:activityId", (schema, request) => {
            const activityId = request.params.activityId;
            const userId = request.params.userId;
            console.log(schema.activities);
            const user = schema.users.find(userId);
            return schema.activity.find(activityId).destroy();
        });

        this.get("/user/:id/bookings", (schema, request) => {
            const userId = request.params.id;
            const user = schema.users.find(userId);

            return user.activities;
        });

        this.delete("/admin/activities/:id", (schema, request) => {
            let id = request.params.id;
            return schema.activities.find(id).destroy();
        });

        this.post("/auth/login", (schema, request) => {
            const { username, password } = JSON.parse(request.requestBody);
            const user = schema.users.findBy({ username, password });

            if (user) {
                return { user };
            } else {
                return new Response(
                    400,
                    { some: "reader" },
                    { error: ["username and password combined not exist!"] }
                );
            }
        });
    },

    seeds(server) {
        server.create("user", {
            id: 1,
            username: "Bob",
            role: "ADMIN",
            password: "123",
            activities: [],
        });
        server.create("user", {
            id: 2,
            username: "Adam",
            role: "USER",
            password: "123",
            activities: [],
        });
        server.create("user", {
            id: 3,
            username: "Yves",
            role: "USER",
            password: "123",
            activities: [],
        });

        server.create("activity", {
            id: 1,
            title: "Boxing",
            coach: "Erik Eriksson",
            day: "Monday",
            created: "2023-09-07",
            time: "07:00",
            description: "an amazing activity for you who wants to become strong",
        });
        server.create("activity", {
            id: 2,
            title: "Yoga",
            coach: "Emelie Johansson",
            day: "Tuesday",
            created: "2023-09-10",
            time: "15:00",
            description: "an amazing activity for you who wants to relax",
        });
        server.create("activity", {
            id: 3,
            title: "Spinning",
            coach: "Ulf Andersson",
            day: "Wednesday",
            created: "2023-09-07",
            time: "18:00",
            description: "an amazing activity for you who wants to become strong",
        });
        server.create("activity", {
            id: 4,
            title: "Calming Yoga",
            coach: "Strongy McStrong",
            day: "Monday",
            created: "2023-08-19",
            time: "09:30",
            description: "Random text about the exercise, location and such.",
        });
        server.create("activity", {
            id: 5,
            title: "Cardio",
            day: "Sunday",
            created: "2023-08-19",
            time: "14:00",
            coach: "Strongy McStrong",
            description: "Random text about the exercise, location and such.",
        });
        server.create("activity", {
            id: 6,
            title: "Cardio 2",
            day: "Thursday",
            created: "2023-08-19",
            time: "13:30",
            coach: "Strongy McStrong",
            description: "Random text about the exercise, location and such.",
        });
        server.create("activity", {
            id: 7,
            title: "Karma Yoga",
            day: "Monday",
            created: "2023-08-19",
            time: "11:00",
            coach: "Strongy McStrong",
            description: "Random text about the exercise, location and such.",
        });
        server.create("activity", {
            id: 8,
            title: "Group training",
            day: "Wednesday",
            created: "2023-08-19",
            time: "17:15",
            coach: "Strongy McStrong",
            description: "Random text about the exercise, location and such.",
        });
        server.create("activity", {
            id: 9,
            title: "Jogging",
            day: "Saturday",
            created: "2023-08-19",
            time: "17:15",
            coach: "Strongy McStrong",
            description: "Random text about the exercise, location and such.",
        });
        server.create("activity", {
            id: 10,
            title: "Yoga",
            day: "Saturday",
            created: "2023-08-19",
            time: "18:15",
            coach: "Strongy McStrong",
            description: "Random text about the exercise, location and such.",
        });
        server.create("activity", {
            id: 11,
            title: "Swimming",
            day: "Saturday",
            created: "2023-08-19",
            time: "19:00",
            coach: "Strongy McStrong",
            description: "Random text about the exercise, location and such.",
        });
        server.create("activity", {
            id: 12,
            title: "Boxing 2",
            day: "Friday",
            created: "2023-08-19",
            time: "17:15",
            coach: "Strongy McStrong",
            description: "Random text about the exercise, location and such.",
        });
        server.create("activity", {
            id: 13,
            title: "Boxing 3",
            day: "Tuesday",
            created: "2023-08-19",
            time: "17:15",
            coach: "Strongy McStrong",
            description: "Random text about the exercise, location and such.",
        });
    },
});