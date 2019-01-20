import axios from '../utils/axios';
import {Body, DELETE, FluentHttp, GET, Header, Path, POST, Query, Headers, RequestOptions} from '../utils/FluentHttp';
import Loading from '@/utils/Loading';

export default class UserService extends FluentHttp {

  constructor() {
    super(axios);
  }

  @Loading(false)
  @GET('/health')
  healthCheck() {
  }

  @Loading(true)
  @GET('/users')
  fetchUsers() {
  }


  @Loading(true)
  @DELETE('/user/:id')
  deleteUser(@Path('id') id, @Query('gender') gender) {
  }

  @POST('/user')
  createUser(@Body user) {
  }
}