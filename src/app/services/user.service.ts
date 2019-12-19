import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}
  get() {
    return this.http.get("/api/users");
  }
  getByQuery(query) {
    return this.http.get(`/api/users${query}`);
  }
}
