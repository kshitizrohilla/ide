import styles from '@/styles/custom.module.css';

const FileTreeNode = ({ onSelect, fileName, path, nodes }) => {
  const isDir = !!nodes;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        if (isDir) return;
        onSelect(path);
      }}
      style={{ marginLeft: "15px" }}
    >
      <p className={ isDir ? styles.folder : styles.fileNode }><img className={isDir ? styles.icons : styles.filesIcons} src={isDir ? "https://www.iconpacks.net/icons/2/free-folder-icon-1484-thumb.png" : "https://static-00.iconduck.com/assets.00/javascript-js-icon-2048x2048-nyxvtvk0.png"} />{fileName}</p>
      {nodes && fileName !== "node_modules" && (
        <ul className={styles.ulul}>
          {Object.keys(nodes).map((child) => (
            <li key={child}>
              <FileTreeNode
                onSelect={onSelect}
                path={path + '/' + child}
                fileName={child}
                nodes={nodes[child]}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
  
const Explorer = ({ tree, onSelect }) => {
  return <FileTreeNode onSelect={onSelect} fileName="/" path="" nodes={tree} />
};

export default Explorer;
