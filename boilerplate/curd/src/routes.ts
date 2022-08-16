import { CurdController } from "./controller/CurdController"

export const Routes = [{
    method: "get",
    route: "/curd",
    controller: CurdController,
    action: "all"
}, {
    method: "get",
    route: "/curd/:id",
    controller: CurdController,
    action: "one"
}, {
    method: "post",
    route: "/curd",
    controller: CurdController,
    action: "post"
}, {
    method: "put",
    route: "/curd/:id",
    controller: CurdController,
    action: "put"
}, {
    method: "patch",
    route: "/curd/:id",
    controller: CurdController,
    action: "save"
}, {
    method: "delete",
    route: "/curd/:id",
    controller: CurdController,
    action: "remove"
}]