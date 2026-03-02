
$(document).ready(function() {
    
    //Inicjalizacja Drag & Drop
    $("#shoppingList").sortable();

    //Funkcja pomocnicza do tworzenia elementu
    function createItem(text) {
        return $("<li>").addClass("list-group-item").text(text);
    }

    //Dodawanie elementów (Append / Prepend)
    $("#addEnd").click(function() {
        let val = $("#productInput").val();
        if(val) {
            $("#shoppingList").append(createItem(val));
            $("#productInput").val("");
        }
    });

    $("#addStart").click(function() {
        let val = $("#productInput").val();
        if(val) {
            $("#shoppingList").prepend(createItem(val));
            $("#productInput").val("");
        }
    });

    $("#productInput").on("keypress", function(e) {
        if (e.which === 13) {
        let val = $(this).val();
        
        if (val) {
            $("#shoppingList").prepend(createItem(val));
            
            $(this).val("");
        }
    }
});

    //Usuwanie i czyszczenie
    $("#removeLast").click(function() {
        $("#shoppingList li").last().remove();
    });

    $("#clearList").click(function() {
        $("#shoppingList").empty();
    });

    $("#restoreList").click(function() {
        $("#shoppingList").html('<li class="list-group-item">Jabłka</li><li class="list-group-item">Woda</li>');
    });

    //Dynamiczna edycja i Active
    $("#shoppingList").on("click", "li", function() {
        $(this).toggleClass("active");
    });

    $("#shoppingList").on("dblclick", "li", function() {
        let currentText = $(this).text();
        let $li = $(this);
        let $input = $("<input type='text'>").val(currentText);

        $li.fadeOut(300, function() {
            $li.html($input).fadeIn(300);
            $input.focus();
        });

        $input.on("keypress", function(e) {
            if(e.which === 13) {
                let newText = $(this).val();
                $li.fadeOut(300, function() {
                    $li.text(newText).fadeIn(300);
                });
            }
        });
    });

    //Kolorowanie co drugiego elementu
    $("#colorEven").click(function() {
        $("#shoppingList li:even").css("background-color", "#db88b4");
    });

    //Usuwanie kolorowania co drugiego elementu
    $("#resetEven").click(function() {
    $("#shoppingList li").css("background-color", "");
    });

    //Sortowanie alfabetyczne
    $("#sortAlpha").click(function() {
        let items = $("#shoppingList li").get();
        items.sort(function(a, b) {
            return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
        });
        $.each(items, function(i, li) {
            $("#shoppingList").append(li);
        });
    });

    //Filtrowanie
    $("#filterInput").on("keyup", function() {
        let value = $(this).val().toLowerCase();
        $("#shoppingList li").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
});
