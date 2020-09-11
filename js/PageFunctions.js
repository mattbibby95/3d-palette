function openNav() {
    document.getElementById("Sidebar").style.width = "10%";
    document.getElementById("SidebarToggle").style.right = "-100";
}
function closeNav() {
    document.getElementById("Sidebar").style.width = "0";
    document.getElementById("SidebarToggle").style.right = "0";
}
function openHead() {
    document.getElementById("Header").style.height = "10%";
    document.getElementById("HeaderToggle").style.top = "-100";
}
function closeHead() {
    document.getElementById("Header").style.height = "0";
    document.getElementById("HeaderToggle").style.top = "0";
}