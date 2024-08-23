//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Net.Http;
//using System.Net;
//using System.Text;
//using System.Text.Json;
//using System.Threading.Tasks;
//using Microsoft.AspNetCore.Http;

//namespace AddressBook.Objects.Middlewares
//{
//    public class ExceptionMiddleware
//    {
//        private readonly RequestDelegate _next;
//        private readonly ILogger<ExceptionMiddleware> _logger;

//        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
//        {
//            _next = next;
//            _logger = logger;
//        }

//        public async Task InvokeAsync(HttpContext context)
//        {
//            try
//            {
//                await _next(context);
//            }
//            catch (Exception ex)
//            {
//                _logger.LogError(ex, "An unexpected error occurred.");
//                await HandleExceptionAsync(context, ex);
//            }
//        }

//        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
//        {
//            context.Response.ContentType = "application/json";

//            // Customize the response based on the exception type
//            HttpStatusCode status;
//            string message;

//            // You can add more exception types and customize responses accordingly
//            switch (exception)
//            {
//                case ArgumentNullException _:
//                    status = HttpStatusCode.BadRequest;
//                    message = exception.Message;
//                    break;
//                case KeyNotFoundException _:
//                    status = HttpStatusCode.NotFound;
//                    message = exception.Message;
//                    break;
//                default:
//                    status = HttpStatusCode.InternalServerError;
//                    message = "An unexpected error occurred.";
//                    break;
//            }

//            var response = new { error = message };

//            context.Response.StatusCode = (int)status;
//            return context.Response.WriteAsync(JsonSerializer.Serialize(response));
//        }
//    }
//}
