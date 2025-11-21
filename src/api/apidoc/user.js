/**
 * @api {get} /api/v1/user Get all users
 * @apiName GetUsers
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Object[]} users List of users.
 * @apiSuccess {Number} users.user_id User ID.
 * @apiSuccess {String} users.name Full name.
 * @apiSuccess {String} users.username Username.
 * @apiSuccess {String} users.email Email address.
 * @apiSuccess {String} users.role User role ("admin" or "user").
 *
 * @apiError (500) ServerError Database error.
 */

/**
 * @api {post} /api/v1/user Create a new user
 * @apiName PostUser
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiBody {String} name User's full name (min 3 chars).
 * @apiBody {String} email Valid email address.
 * @apiBody {String} username Username (3–20 chars, alphanumeric).
 * @apiBody {String} password Password (min 8 chars).
 * @apiBody {String="admin","user"} role User role.
 *
 * @apiSuccess (201) {String} message Success message.
 * @apiSuccess (201) {Object} result Created user result.
 *
 * @apiError (400) ValidationError Invalid input data.
 */

/**
 * @api {put} /api/v1/user/:id Update user
 * @apiName UpdateUser
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} id User ID.
 *
 * @apiBody {String} [name] User name.
 * @apiBody {String} [email] Valid email.
 * @apiBody {String} [username] Username (3–20 chars).
 * @apiBody {String} [password] Password (min 8 chars).
 * @apiBody {String="admin","user"} [role] User role.
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiError (400) ValidationError Invalid data.
 * @apiError (403) Forbidden Only owner or admin can modify.
 * @apiError (404) NotFound User not found.
 */

/**
 * @api {delete} /api/v1/user/:id Delete user
 * @apiName DeleteUser
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} id User ID.
 *
 * @apiSuccess {String} message User deleted.
 *
 * @apiError (403) Forbidden Only owner or admin can delete.
 * @apiError (404) NotFound User not found.
 */
