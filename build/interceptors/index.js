"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestLoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let NestLoggingInterceptor = class NestLoggingInterceptor {
    intercept(context, next) {
        console.log('Before...');
        const now = Date.now();
        return next
            .handle()
            .pipe((0, operators_1.tap)(() => console.log(`After... ${Date.now() - now}ms`)));
    }
};
NestLoggingInterceptor = __decorate([
    (0, common_1.Injectable)()
], NestLoggingInterceptor);
exports.NestLoggingInterceptor = NestLoggingInterceptor;
//# sourceMappingURL=index.js.map