"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.getFile = exports.savePost = exports.uploadFileBelongToProject = exports.getProjects = exports.createProject = exports.login = void 0;
var axios_1 = require("axios");
var FormData = require("form-data");
function login(username, password) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_1;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.post("http://localhost:3000/v1/media/login", {
                            username: username,
                            password: password,
                        }, {
                            withCredentials: true,
                        })];
                case 1:
                    response = _c.sent();
                    return [2 /*return*/, { error: response.data.error, message: response.data.message, valid: response.data.valid }];
                case 2:
                    error_1 = _c.sent();
                    console.error('Error uploading post:', (_a = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _a === void 0 ? void 0 : _a.data);
                    console.error("Request that caused the error: ", error_1 === null || error_1 === void 0 ? void 0 : error_1.request);
                    return [2 /*return*/, { error: (_b = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _b === void 0 ? void 0 : _b.data, request: error_1 === null || error_1 === void 0 ? void 0 : error_1.request, status: error_1.response ? error_1.response.status : null }]; // Ném lỗi để xử lý bên ngoài
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.login = login;
// Tạo project 
function createProject(creatProjectInfo) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_2;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.post("http://localhost:3000/v1/media/project/create", creatProjectInfo, {
                            withCredentials: true,
                        })];
                case 1:
                    response = _c.sent();
                    return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                case 2:
                    error_2 = _c.sent();
                    console.error('Error uploading post:', (_a = error_2 === null || error_2 === void 0 ? void 0 : error_2.response) === null || _a === void 0 ? void 0 : _a.data);
                    console.error("Request that caused the error: ", error_2 === null || error_2 === void 0 ? void 0 : error_2.request);
                    return [2 /*return*/, { error: (_b = error_2 === null || error_2 === void 0 ? void 0 : error_2.response) === null || _b === void 0 ? void 0 : _b.data, request: error_2 === null || error_2 === void 0 ? void 0 : error_2.request, status: error_2.response ? error_2.response.status : null }]; // Ném lỗi để xử lý bên ngoài
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.createProject = createProject;
// lấy thông tin project đã tạo
function getProjects(criteria) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_3;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.post("http://localhost:3000/v1/media/project/get", criteria || {}, {
                            withCredentials: true,
                        })];
                case 1:
                    response = _c.sent();
                    return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                case 2:
                    error_3 = _c.sent();
                    console.error('Error getting posts:', (_a = error_3 === null || error_3 === void 0 ? void 0 : error_3.response) === null || _a === void 0 ? void 0 : _a.data);
                    console.error("Request that caused the error: ", error_3 === null || error_3 === void 0 ? void 0 : error_3.request);
                    return [2 /*return*/, { error: (_b = error_3 === null || error_3 === void 0 ? void 0 : error_3.response) === null || _b === void 0 ? void 0 : _b.data, request: error_3 === null || error_3 === void 0 ? void 0 : error_3.request, status: error_3.response ? error_3.response.status : null }]; // Ném lỗi để xử lý bên ngoài
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getProjects = getProjects;
// upload những file liên quan đến project giống như latex
function uploadFileBelongToProject(postPayload) {
    return __awaiter(this, void 0, void 0, function () {
        var formData, response, error_4;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    formData = new FormData();
                    formData.append('file', postPayload.file);
                    return [4 /*yield*/, axios_1.default.post("http://localhost:3000/v1/media/project/file?project_id=".concat(postPayload.project_id), formData, {
                            withCredentials: true,
                        })];
                case 1:
                    response = _c.sent();
                    return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                case 2:
                    error_4 = _c.sent();
                    console.error('Error uploading post:', (_a = error_4 === null || error_4 === void 0 ? void 0 : error_4.response) === null || _a === void 0 ? void 0 : _a.data);
                    console.error("Request that caused the error: ", error_4 === null || error_4 === void 0 ? void 0 : error_4.request);
                    return [2 /*return*/, { error: (_b = error_4 === null || error_4 === void 0 ? void 0 : error_4.response) === null || _b === void 0 ? void 0 : _b.data, request: error_4 === null || error_4 === void 0 ? void 0 : error_4.request, status: error_4.response ? error_4.response.status : null }]; // Ném lỗi để xử lý bên ngoài
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.uploadFileBelongToProject = uploadFileBelongToProject;
//lưu bài viết
function savePost(postPayload) {
    return __awaiter(this, void 0, void 0, function () {
        var formData, response, error_5;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    formData = new FormData();
                    formData.append('file', postPayload.file);
                    return [4 /*yield*/, axios_1.default.post("http://localhost:3000/v1/media/project/post?id=".concat(postPayload.project_id), formData, {
                            withCredentials: true,
                        })];
                case 1:
                    response = _c.sent();
                    return [2 /*return*/, { success: response.data.success, message: response.data.message, data: response.data.data }];
                case 2:
                    error_5 = _c.sent();
                    console.error('Error uploading post:', (_a = error_5 === null || error_5 === void 0 ? void 0 : error_5.response) === null || _a === void 0 ? void 0 : _a.data);
                    console.error("Request that caused the error: ", error_5 === null || error_5 === void 0 ? void 0 : error_5.request);
                    return [2 /*return*/, { error: (_b = error_5 === null || error_5 === void 0 ? void 0 : error_5.response) === null || _b === void 0 ? void 0 : _b.data, request: error_5 === null || error_5 === void 0 ? void 0 : error_5.request, status: error_5.response ? error_5.response.status : null }]; // Ném lỗi để xử lý bên ngoài
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.savePost = savePost;
//lấy file 
function getFile(criteria) {
    return __awaiter(this, void 0, void 0, function () {
        var response, blob, imgUrl, error_6;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.get("http://localhost:3000/v1/media/project/file?project_id=".concat(criteria.project_id, "&file=").concat(criteria.file), {
                            withCredentials: true,
                            responseType: 'arraybuffer',
                        })];
                case 1:
                    response = _c.sent();
                    blob = new Blob([response.data], { type: response.headers['content-type'] });
                    imgUrl = URL.createObjectURL(blob);
                    return [2 /*return*/, { data: imgUrl }];
                case 2:
                    error_6 = _c.sent();
                    console.error('Error getting file:', (_a = error_6 === null || error_6 === void 0 ? void 0 : error_6.response) === null || _a === void 0 ? void 0 : _a.data);
                    console.error("Request that caused the error: ", error_6 === null || error_6 === void 0 ? void 0 : error_6.request);
                    return [2 /*return*/, { error: (_b = error_6 === null || error_6 === void 0 ? void 0 : error_6.response) === null || _b === void 0 ? void 0 : _b.data, request: error_6 === null || error_6 === void 0 ? void 0 : error_6.request, status: error_6.response ? error_6.response.status : null }]; // Ném lỗi để xử lý bên ngoài
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getFile = getFile;
// xóa project bằng project_id
function deleteProject(condition) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_7;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.delete("http://localhost:3000/v1/media/project?project_id=".concat(condition.project_id), {
                            withCredentials: true
                        })];
                case 1:
                    response = _c.sent();
                    return [2 /*return*/, { success: response.data.success, message: response.data.message }];
                case 2:
                    error_7 = _c.sent();
                    console.error('Error getting posts:', (_a = error_7 === null || error_7 === void 0 ? void 0 : error_7.response) === null || _a === void 0 ? void 0 : _a.data);
                    console.error("Request that caused the error: ", error_7 === null || error_7 === void 0 ? void 0 : error_7.request);
                    return [2 /*return*/, { error: (_b = error_7 === null || error_7 === void 0 ? void 0 : error_7.response) === null || _b === void 0 ? void 0 : _b.data, request: error_7 === null || error_7 === void 0 ? void 0 : error_7.request, status: error_7.response ? error_7.response.status : null }]; // Ném lỗi để xử lý bên ngoài
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteProject = deleteProject;
