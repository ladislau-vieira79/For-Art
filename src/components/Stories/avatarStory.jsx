function getIniciais(nome = "") {
  return nome.trim().split(" ").filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join("");
}

// Círculo com a foto do artista, ou as iniciais quando não há foto
function AvatarStory({ nome, foto, className }) {
  return (
    <span className={className}>
      {foto ? <img src={foto} alt="" /> : getIniciais(nome)}
    </span>
  );
}

export default AvatarStory;