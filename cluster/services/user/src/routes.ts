import { UserController } from "./controller/UserController"

export const Routes = [{
    method: "get",
    route: "/user",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/user/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/user",
    controller: UserController,
    action: "post"
}, {
    method: "put",
    route: "/user/:id",
    controller: UserController,
    action: "put"
}, {
    method: "patch",
    route: "/user/:id",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/user/:id",
    controller: UserController,
    action: "remove"
}]