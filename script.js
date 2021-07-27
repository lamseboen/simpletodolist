var dataTodo = []


const showData = payload => {
    let template = `<div class="col-md-3" id="${payload.id}">
                        <div class="card" style="width: 18rem; background-color: ${payload.warna};">
                            <div class="card-body">
                                <h5 class="card-title">${payload.task}</h5>
                                <h6 class="card-title">${payload.tanggal}</h6>
                                <div class="d-flex justify-content-between">
                                    <button class="btn btn-info edit" data-id="${payload.id}"><span class="text-light">&#9998;</span></button>
                                    <button class="btn btn-danger hapus" data-id="${payload.id}"><span class="text-light">&#10006;</span></button>
                                </div>
                            </div>
                        </div>
                    </div>`
    // $("#todo-parent").html(template).show().fadeIn(30000);
    $(template).hide().appendTo('#todo-parent').fadeIn(1000);
}
console.log("ready!");

const deleteData = id => {
    id = `#${id}`
    console.log(id)
    $(`#todo-parent ${id}`).fadeOut(1000, function () {
        $(this).remove()
    })

}

$(document).ready(function () {
    $("#submit-task").click(function (e) {
        e.preventDefault()
        let task = $("#task").val()
        let kategori = $("#kategori").val()
        let tanggal = $("#tanggal").val()
        let isPenting = $('#penting').is(':checked')
        try {
            if (task == "") throw "task"
            if (kategori == 0) throw "kategori"
            if (kategori == 1) {
                warna = "red"
            } else if (kategori == 2) {
                warna = "blue"
            } else if (kategori == 3) {
                warna = "yellow"
            } else {
                warna = "green"
            }
            if (tanggal == "") throw "tanggal"
            let id = Math.floor(100000000 + Math.random() * 900000000)
            showData({
                id,
                task,
                warna,
                tanggal
            })
            $("#task").val("").removeClass("is-invalid")
            $("#kategori").val("").removeClass("is-invalid")
            $("#tanggal").val("").removeClass("is-invalid")
            $('#penting').prop('checked', false)
            $('#collapseExample').collapse("hide")
        } catch (error) {
            console.log(`#${error}`)
            $(`#${error}`).addClass("is-invalid")
        }
    })

    $("#todo-parent").on('click', '.hapus', function () {
        let id = $(this).attr("data-id")
        swal({
                title: "Are you sure?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    deleteData(id)
                    swal("Poof! Your data  has been deleted!", {
                        icon: "success",
                    });
                }
            });
    })
});