import {Body, DELETE, ElegantHttp, GET, Header, Path, POST, Query, Headers, RequestOptions} from '../utils/ElegantHttp';
import Loading from '@/utils/Loading';

export default class UserService extends ElegantHttp {

  @Loading(false)
  @GET('/health')
  healthCheck() {
  }

  @Loading(false)
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