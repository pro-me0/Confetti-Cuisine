$(document).ready(() => {
  const socket = io();
  $("#modal-button").click(() => {
    $(".modal-body").html("");
    $.get(`/api/courses`, (results = {}) => {
      let data = results.data;
      if (!data || !data.courses) return;
      data.courses.forEach(course => {
        $(".modal-body").append(
          `<div>
						<span class="course-title">
							${course.title}
						</span>
						<span class="course-cost">#${course.cost}</span>
						<button class="${course.joined ? "joined-button" : "join-button"} btn btn-info btn-sm" data-id="${
            course._id
          }">
							${course.joined ? "Joined" : "Join"}
						</button>
						<div class="course-description">
							${course.description}
						</div>
					</div>`
        );
      });
    }).then(() => {
      addJoinButtonListener();
    });
  });



$("#chatForm").submit(() => {
  let text = $("#chat-input").val(),
  userEmail = $("#chat-user-email").val(),
  userName = $("#chat-user-name").val();
  socket.emit("message", {
    content: text,
    userEmail: userEmail,
    userName: userName
  });
  $("#chat-input").val("");
  return false;
});

socket.on("message", (message) => {
  displayMessage(message);
  for(let i = 0; i<2; i++){
    $(".chat-icon").fadeOut(200).fadeIn(200);
  }
});

/*socket.on("user disconnected", () => {
  displayMessage({
    userName: "Notice!",
    content: "User left the chat"
  });
});*/

$('.ti > input').click((event) => {
  e = event.target;
  console.log(e)
  $(e).fadeOut(200).fadeIn(200)
})

socket.on("load all messages", (data) => {
  $("#chat").html('');
  data.forEach(message => {
    displayMessage(message);
  })
});

let displayMessage = (message) => {
  let userId = $("#chat-user-id").val();
  $("#chat").prepend(
    $(`<li id='li' class="li ${getCurrentUserClass(message.user)}">`).html(`
      <strong class="message">
      ${message.userName}
      </strong><pre>${message.content}</pre>
      `)
    );
  $("#li").append($("<sup>").html((message.sentAt === undefined ? new Date().toDateString() + ' ' + new Date().toLocaleTimeString() : message.sentAt)));
  $("#li").prepend($("<small>").html('❌').click(() => {
    $.get(`api/chat/${message._id}/delete?_method=DELETE`, (res) => {
      if(res.data){
        $("#chat").html('');
        socket.emit("load all messages", res.messages.reverse())
        res.messages.forEach(message => {
          displayMessage(message);
        })
      }
    });
  }));
}
let getCurrentUserClass = (id) => {
  let userId = $("#chat-user-email").val();
  return userId === id ? "current-user": "";
};


});

let addJoinButtonListener = () => {
  $(".join-button").click(event => {
    let $button = $(event.target),
      courseId = $button.data("id");
    console.log(`/api/courses/${courseId}/join`);
    $.get(`/api/courses/${courseId}/join`, (results = {}) => {
      let data = results.data;
      if (data && data.success) {
        $button
          .text("Joined")
          .addClass("joined-button")
          .removeClass("join-button");
      } else {
        $button.text("Try again");
      }
    });
  });
};
